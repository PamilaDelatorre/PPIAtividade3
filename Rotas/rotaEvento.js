//micro aplicação HTTP oferecida pelo express
import { Router } from "express";
import EventoCtrl from "../Controle/EventoCtrl.js"

const rotaEvento = Router();
const ctrlEvento = new EventoCtrl();

rotaEvento.get("/", ctrlEvento.consultar)
.get("/:termoBusca", ctrlEvento.consultar)
.post("/", ctrlEvento.gravar)
.put("/:codigo", ctrlEvento.alterar)
.delete("/:codigo", ctrlEvento.excluir);

export default rotaEvento;