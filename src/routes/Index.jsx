import Illustration1 from "../assets/Illustration2.svg";

export default function Index() {
    return (
        <div className="row row-content">
            <div className="col">
                <h1 className="brand-slogan">Aprende Felíz</h1>
                <p className="brand-description">
                    Estudios recientes han demostrado que incluir las Emociones
                    durante el proceso de aprendizaje, mejora los resultados.
                    También está demostrado que cada acción humana es provocada
                    por una emoción.
                </p>
            </div>
            <div className="col">
                <img src={Illustration1} />
            </div>
        </div>
    );
}
