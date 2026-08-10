import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import urlConfig from "../../config";

const MainPage = () => {
    const [gifts, setGifts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGifts = async () => {
            try {
                const url = `${urlConfig.backendUrl}/api/gifts`;

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error; ${response.status}`);
                }

                const data = await response.json();

                setGifts(data);
            } catch (error) {
                console.log("Fetch error: " + error.message);
            }
        };

        fetchGifts();
    }, []);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);

        return date.toLocaleDateString("default", {
            month: "long",
            day: "numeric",
            year: "numeric"
        });
    };

    const handleGiftClick = (productId) => {
        navigate(`/app/product/${productId}`);
    };

    return (
        <div className="container mt-4">
            <div className="row">
                {gifts.map((gift) => (
                    <div
                        className="col-md-4 mb-4"
                        key={gift.id}
                        onClick={() => handleGiftClick(gift.id)}
                        style={{ cursor: "pointer" }}
                    >
                        <div className="card h-100">
                            <div className="image-placeholder">
                                {gift.image ? (
                                    <img
                                        src={gift.image}
                                        alt={gift.name}
                                        className="card-img-top"
                                    />
                                ) : (
                                    <div className="no-image-available p-4 text-center">
                                        No Image Available
                                    </div>
                                )}
                            </div>

                            <div className="card-body">
                                <h5 className="card-title">
                                    {gift.name}
                                </h5>

                                <p className="card-text">
                                    {formatDate(gift.date_added)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainPage;