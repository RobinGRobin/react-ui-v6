import CardStudent from "../design/CardStudent";

export default function DetailClass() {
    const exampleData = {
        title: "Propagación de ondas",
        accessCode: "FCPKI",
        emotionRecord: [
            {
                happy: 20,
                angry: 2,
                disgust: 15,
                calm: 15,
                sad: 10,
                confussion: 3,
                surprise: 5,
                fear: 30,
            },
        ],
    };

    const studentRecord = [
        { name: "Pancho" },
        { name: "Juan" },
        { name: "María" },
        { name: "José" },
        { name: "Pedro" },
        { name: "Felipe" },
        { name: "Robin" },
        { name: "Alejandra" },
        { name: "Jessica" },
        { name: "Uriel" },
        { name: "Rosa" },
        { name: "Miguel" },
        { name: "Daniel" },
        { name: "Abril" },
        { name: "Julio" },
        { name: "John" },
    ];

    return (
        <div className="class-detail-container">
            <p>{exampleData.title}</p>

            <div className="class-member-container">
                <div className="member-grid">
                    <h4>Integrantes de la clase</h4>
                    <div className="row">
                        {studentRecord.map((name) => (
                            <div className="col" key={name.name}>
                                <CardStudent title={name.name} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
