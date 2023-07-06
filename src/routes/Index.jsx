import Illustration1 from "../assets/Illustration2.svg";

export default function Index() {
    return (
        <div className="row row-content">
            <div className="col">
                <h1 className="brand-slogan">
                    Emotional learning is important
                </h1>
                <p className="brand-description">
                    Recent studies have shown that including emotions during the
                    learing process leads to better results. It is also shown
                    that every human action is triggered by an emotion.
                </p>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control custom-input"
                        placeholder="Your email"
                        aria-label="Your email"
                        aria-describedby="button-addon2 custom-addon"
                    ></input>
                    <button
                        className="btn btn-outline-secondary custom-btn"
                        type="button"
                        id="button-addon2"
                    >
                        Registrarse
                    </button>
                </div>
            </div>
            <div className="col">
                <img src={Illustration1} />
            </div>
        </div>
    );
}
