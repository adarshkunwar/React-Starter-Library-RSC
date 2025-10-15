export const Logger = {
  info: (message: string, data?: any) => {
    console.log(`ℹ️  ${message}`);
    if (data) console.log(JSON.stringify(data, null, 2));
  },

  success: (message: string, data?: any) => {
    console.log(`✅ ${message}`);
    if (data) console.log(JSON.stringify(data, null, 2));
  },

  error: (message: string, data?: any) => {
    console.log(`❌ ${message}`);
    if (data) console.log(JSON.stringify(data, null, 2));
  },

  warn: (message: string, data?: any) => {
    console.log(`⚠️  ${message}`);
    if (data) console.log(JSON.stringify(data, null, 2));
  },

  debug: (message: string, data?: any) => {
    console.log(`🔍 ${message}`);
    if (data) console.log(JSON.stringify(data, null, 2));
  },
};
