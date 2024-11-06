import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import axios from 'axios';
import ActionCard from './ActionCard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import actions from '../helpers/actions'
const ScenarioBuilder = () => {
  const [scenario, setScenario] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ACTION',
    drop: (item) => addToScenario(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addToScenario = (action) => {
    setScenario((prevScenario) => [...prevScenario, { ...action }]);
  };

  const removeAction = (index) => {
    setScenario((prevScenario) => prevScenario.filter((_, i) => i !== index));
  };

  const moveActionUp = (index) => {
    if (index === 0) return;
    setScenario((prevScenario) => {
      const newScenario = [...prevScenario];
      [newScenario[index - 1], newScenario[index]] = [newScenario[index], newScenario[index - 1]];
      return newScenario;
    });
  };

  const moveActionDown = (index) => {
    if (index === scenario.length - 1) return;
    setScenario((prevScenario) => {
      const newScenario = [...prevScenario];
      [newScenario[index], newScenario[index + 1]] = [newScenario[index + 1], newScenario[index]];
      return newScenario;
    });
  };

  const handleParamChange = (index, paramName, value) => {
    setScenario((prevScenario) => {
      const newScenario = [...prevScenario];
      newScenario[index].params[paramName] = value;
      return newScenario;
    });
  };

  // Doğrulama şeması: Her aksiyon türü için gerekli parametreleri tanımlıyoruz.
  const validationSchema = Yup.object().shape({
    goto: Yup.object({
      url: Yup.string().url('Geçerli bir URL girin.').required('URL alanı zorunludur.'),
    }),
    click: Yup.object({
      selector: Yup.string().required('Selector alanı zorunludur.'),
    }),
    // Diğer aksiyon türleri için kurallar ekleyebilirsiniz
  });

  const validateScenario = async () => {
    for (let i = 0; i < scenario.length; i++) {
      const action = scenario[i];
      const actionSchema = validationSchema.fields[action.type];
      if (actionSchema) {
        try {
          await actionSchema.validate(action.params);
        } catch (error) {
          toast.error(`Adım ${i + 1}: ${error.message}`);
          return false;
        }
      }
    }
    return true;
  };
  const getPlaceholderText = (paramName) => {
    switch (paramName) {
      case 'url':
        return '(örn: https://example.com)';
      case 'selector':
        return '(örn: #id veya .class)';
      case 'time':
        return '(milisaniye cinsinden)';
      case 'text':
        return 'Yazılacak metni girin';
      case 'key':
        return 'Tuşu girin (örn: Enter, Tab)';
      case 'path':
        return 'Dosya yolunu girin (örn: screenshot.png)';
      case 'x':
        return 'Yatay kaydırma miktarı';
      case 'y':
        return 'Dikey kaydırma miktarı';
      default:
        return `Bir ${paramName} değeri girin`;
    }
  };
  const runScenario = async () => {
    const isValid = await validateScenario();
    if (!isValid) {
      toast.error('Senaryo çalıştırılmadan önce tüm alanların doldurulması gerekiyor.');
      return;
    }

    setIsRunning(true);
    try {
      await axios.post('http://localhost:4000/run-script', { scenario });
      toast.success("Senaryo başarıyla tamamlandı!");
    } catch (error) {
      toast.error('Hata oluştu: ' + error.message);
    } finally {
      setIsRunning(false);
    }
  };
  const saveScenario = async () =>{
    const isValid = await validateScenario();
    if (!isValid) {
      toast.error('Senaryo kaydedilmeden önce tüm alanların doldurulması gerekiyor.');
      return;
    }
    try {
      await axios.post('http://localhost:4000/save-script', { scenario });
      toast.success("Senaryo başarıyla kaydedildi!");
    } catch (error) {
      toast.error('Hata oluştu: ' + error.message);
    }
  }
  return (
    <div style={{ display: 'flex', height: '80vh', padding: '20px', boxSizing: 'border-box' }}>
      <ToastContainer position="top-right" autoClose={5000} />

      {/* Sol Taraf: Aksiyonlar */}
      <div className="action-cards" style={{ flex: '1', marginRight: '20px', border: '2px solid #007bff', borderRadius: '8px' }}>
        <div className="card shadow-sm h-100">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">İşlemler</h5>
          </div>
          <div className="card-body" style={{ maxHeight: '800px', overflowY: 'auto' }}>
            {actions.map((action, index) => (
              <ActionCard key={index} action={action} />
            ))}
          </div>
        </div>
      </div>

      {/* Sağ Taraf: Senaryo */}
      <div className="scenario-area" style={{ flex: '2', border: '2px solid #28a745', borderRadius: '8px' }}>
        <div className="card shadow-sm h-100">
          <div className="card-header bg-success text-white">
            <h5 className="mb-0">Senaryo</h5>
          </div>
          <div
            ref={drop}
            className="card-body"
            style={{ maxHeight: '800px', overflowY: 'auto', backgroundColor: isOver ? '#e9f7ef' : 'white' }}
          >
            {scenario.length > 0 ? (
              scenario.map((item, index) => (
                <div key={index} className="d-flex align-items-start justify-content-between mb-3 border">
                  <div>
                    <h6>{item.name}</h6>
                    {/* Parametre inputlarını burada gösteriyoruz */}
                    {Object.keys(item.params).map((paramName) => (
                      <div className="form-group" key={paramName}>
                        <label>{paramName}</label>
                        <input
                          type="text"
                          value={item.params[paramName]}
                          onChange={(e) => handleParamChange(index, paramName, e.target.value)}
                          className="form-control w-100"
                          
                          placeholder={getPlaceholderText(paramName)}
                        />
                      </div>
                    ))}
                  </div>
                  <div className='d-flex align-items-start justify-content-between'>
                    <button className="btn btn-primary btn-sm m-2" onClick={() => moveActionUp(index)}>
                      Yukarı Taşı
                    </button>
                    <button className="btn btn-warning btn-sm m-2" onClick={() => moveActionDown(index)}>
                      Aşağı Taşı
                    </button>
                    <button className="btn btn-danger btn-sm m-2" onClick={() => removeAction(index)}>
                      Sil
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted">Senaryo oluşturmak için işlemleri buraya sürükleyin.</p>
            )}
          </div>

          <div className="card-footer text-right">
            <button onClick={runScenario} className="btn btn-primary run-scenario-button mr-5" disabled={isRunning}>
              {isRunning ? "Çalışıyor..." : "Senaryoyu Çalıştır"}
            </button>
            <button className="btn btn-secondary" onClick={saveScenario}>Senaryoyu Kaydet </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioBuilder;
