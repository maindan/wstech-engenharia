// Caminho base do site. Vazio na raiz do domínio; "/wstech-engenharia" no GitHub Pages de projeto.
// Next prefixa sozinho o JS/CSS (_next), mas não <img src> e <a href> escritos à mão: use asset() neles.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${basePath}${path}`;
