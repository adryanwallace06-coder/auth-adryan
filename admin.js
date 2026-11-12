import usuarios from "./usuarios.js";

const admin = usuarios.map(({ password, ...dados }) => dados);

export default admin;