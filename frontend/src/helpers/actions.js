 const actions = [
    { name: 'Sayfa Aç', type: 'goto', params: { url: '' } },
    { name: 'Butona Tıkla', type: 'click', params: { selector: '' } },
    { name: 'Bekle', type: 'wait', params: { time: 1000 } },
    { name: 'Metin Yaz', type: 'type', params: { selector: '', text: '' } },
    { name: 'Klavyeden Tuşa Bas', type: 'keyboardPress', params: { key: '' } },
    { name: 'Ekran Görüntüsü Al', type: 'screenshot', params: { path: 'screenshot.png' } },
    { name: 'Bir Elementin Görünmesini Bekle', type: 'waitForSelector', params: { selector: '' } },
    { name: 'Bir Elementin Kaybolmasını Bekle', type: 'waitForSelectorHidden', params: { selector: '' } },
    { name: 'Yeni Sekme Aç', type: 'newPage', params: {} },
    { name: 'Sayfayı Yeniden Yükle', type: 'reload', params: {} },
    { name: 'Sayfayı Kaydır', type: 'scroll', params: { x: 0, y: 100 } },
    { name: 'Form Gönder', type: 'submit', params: { selector: '' } },
    { name: 'Elementin İçeriğini Al', type: 'getText', params: { selector: '' } },
  ];
  module.exports =actions