import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ConfigProvider } from 'antd';
import esES from 'antd/lib/locale/es_ES';
import { DatePicker } from 'antd';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';

const MyDatePicker = DatePicker.generatePicker(dateFnsGenerateConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider locale={esES} components={{ DatePicker: MyDatePicker }}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);