import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

let lang = localStorage.getItem("lang");
if (!lang) {
  lang = 'vi';
  localStorage.setItem('lang', 'vi');
}

i18n
  .use(HttpBackend) // Load file ngôn ngữ qua HTTP
  .use(LanguageDetector) // Tự động phát hiện ngôn ngữ trình duyệt
  .use(initReactI18next) // Kết nối với React
  .init({
    lng: lang, // Ngôn ngữ mặc định
    fallbackLng: 'vi', // Ngôn ngữ fallback
    debug: true, // Bật debug để theo dõi quá trình tải ngôn ngữ
    interpolation: {
      escapeValue: false, // React đã xử lý XSS
    },
    backend: {
      loadPath: `src/public/locales/${lang}/translate.json`, // Sử dụng đường dẫn trực tiếp từ thư mục public
      ajax: (url: any, options: any, callback: any) => {
        console.log('Fetching translation file from URL:', url); // Log URL để kiểm tra
      }
    },
    ns: ['translate'], // Namespace mặc định
    defaultNS: 'translate', // Namespace mặc định
  });

export default i18n;
