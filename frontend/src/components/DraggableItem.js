// DraggableItem.js

import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const DraggableItem = ({ item, index, onRemove, onUpdateActionParams }) => {
  const validationSchema = Yup.object().shape({
    url: Yup.string()
      .url('Geçerli bir URL girin.')
      .matches(/^https?:\/\//, 'URL "http://" veya "https://" ile başlamalıdır.')
      .required('URL alanı zorunludur.'),
    selector: Yup.string()
      .required('Selector alanı zorunludur.')
      .matches(/^(\.|#)?[a-zA-Z0-9_-]+$/, 'Geçerli bir selector girin (örn. ".class", "#id" veya "tagname").'),
  });

  const handleChange = (paramName, value) => {
    onUpdateActionParams(index, paramName, value);

    validationSchema
      .validate({ [paramName]: value })
      .catch((error) => toast.error(`${item.name} - ${error.message}`));
  };

  return (
    <Draggable draggableId={`draggable-${index}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ marginBottom: '10px', ...provided.draggableProps.style }}
        >
          <div className="card">
            <div className="card-body">
              <h5>{item.name}</h5>
              {Object.keys(item.params).map((paramName) => (
                <div className="form-group" key={paramName}>
                  <label>{paramName}</label>
                  <input
                    type="text"
                    value={item.params[paramName]}
                    onChange={(e) => handleChange(paramName, e.target.value)}
                    className="form-control"
                    placeholder={`Bir ${paramName} değeri girin`}
                  />
                </div>
              ))}
              <button
                className="btn btn-danger btn-sm mt-2"
                onClick={() => onRemove(index)}
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItem;
