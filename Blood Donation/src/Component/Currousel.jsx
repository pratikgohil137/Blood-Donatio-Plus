const Currousel = () => {
    return (
        <div id="carouselExampleAutoplaying" className="carousel slide " data-bs-ride="true">
            <div className="carousel-inner height">
                <div className="carousel-item active">
                    <img src="https://eraktkosh.mohfw.gov.in/BLDAHIMS/bloodbank/transactions/assets/webp/thankublooddonors.png" className="d-block w-100" alt="curr1" />
                </div>
                <div className="carousel-item height">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhqG0a9vw0H_kUp7mpzCG3odxOxu2iSZC_tQ&s" className="d-block w-100" alt="curr2" />
                </div>
                <div className="carousel-item height">
                    <img src="https://t3.ftcdn.net/jpg/02/98/40/62/360_F_298406281_7ShdAreeDMqUWMSrKUDYMzrhZGfv02gx.jpg" className="d-block w-100" alt="curr3" />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Currousel;