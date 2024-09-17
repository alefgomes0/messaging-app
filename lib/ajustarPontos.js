function ajustarPontos(iniciaisNome) {
  let nomeAjustado = "";
  const nomeMaiusculo = iniciaisNome.toUpperCase();
  for (let s of nomeMaiusculo) {
    console.log(s)
    if (s === "." || s === " ") continue;
    nomeAjustado += `${s}.`;
  }
  return nomeAjustado;
}

module.exports = ajustarPontos;
