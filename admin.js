import usuarios from "./usuarios.js";

const admin = usuarios.map(({ senha, ...dados }) => dados);

export default admin;