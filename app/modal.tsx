import React from "react";
import EditScreenInfo from "@/components/EditScreenInfo";

// Como este arquivo representa a tela de modal em si,
// podemos simplesmente renderizar o nosso componente de configurações diretamente.
// O componente EditScreenInfo já foi projetado para ocupar a tela inteira.
export default function ModalScreen() {
  return <EditScreenInfo />;
}
