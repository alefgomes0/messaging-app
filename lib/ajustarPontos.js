function ajustarPontos(iniciaisNome) {
  let nomeAjustado = "";
  const nomeMaiusculo = iniciaisNome.toUpperCase();
  for (let s of nomeMaiusculo) {
    if (s === "." || s === " ") continue;
    nomeAjustado += `${s}.`;
  }
  return nomeAjustado;
}

module.exports = ajustarPontos;
