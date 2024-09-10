import messages from '@intlify/unplugin-vue-i18n/messages';
import { createI18n } from 'vue-i18n';
import { get, useStorage } from '@vueuse/core';
const i18n = createI18n({
  legacy: false,
  locale: useStorage('lang', 'zh').value,
  messages
});
export const i18nPlugin = {
  install(app) {
    app.use(i18n);
  }
};
export const translate = function (localeKey) {
  const hasKey = i18n.global.te(localeKey, get(i18n.global.locale));
  return hasKey ? i18n.global.t(localeKey) : localeKey;
};
