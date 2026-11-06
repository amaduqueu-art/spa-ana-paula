import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Sem cache incremental por enquanto (não há bindings de R2/KV configurados).
  // Para habilitar, siga: https://opennext.js.org/cloudflare/caching
});
