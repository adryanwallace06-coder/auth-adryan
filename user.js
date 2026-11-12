import usuarios from "./usuarios.js";
import planos from "./planos.js";

const user = usuarios.map(({ id, nome, email, username, plano }) => ({
    id,
    nome,
    email,
    username,
    plano,
    recursos: planos.find((p) => p.nome === plano)?.recursos ?? []
}));

export default user;