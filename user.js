import usuarios from "./usuarios.js";
import planos from "./planos.js";

const user = usuarios.map(({ id, nome, email, plano }) => ({
    id,
    nome,
    email,
    plano,
    recursos: planos.find((p) => p.nome === plano)?.recursos ?? []
}));

export default user;