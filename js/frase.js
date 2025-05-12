document.addEventListener("DOMContentLoaded", () => {
  const frases = [
    "Respire fundo. Você não está atrasado para sua própria vida.",
    "Lembre-se: os melhores momentos não estão no feed.",
    "Hoje é um bom dia para ouvir sua música favorita com calma.",
    "Olhe pela janela. O tempo ainda passa devagar lá fora.",
    "Escreva algo com a própria mão. Sinta o papel."
  ];
  const frase = frases[Math.floor(Math.random() * frases.length)];
  document.getElementById("frase").textContent = frase;
});
