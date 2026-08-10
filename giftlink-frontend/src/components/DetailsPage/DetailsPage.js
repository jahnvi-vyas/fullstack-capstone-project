import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import urlConfig from "../../config";
import "./DetailsPage.css";

function DetailsPage() {
    const [gift, setGift] = useState(null);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { productId } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);

        const token = sessionStorage.getItem("token");

        if (!token) {
            navigate("/app/login");
            return;
        }

        const fetchGiftDetails = async () => {
            try {
                const response = await fetch(
                    `${urlConfig.backendUrl}/api/gifts/${productId}`
                );

                if (!response.ok) {
                    throw new Error(
                        `HTTP error; ${response.status}`
                    );
                }

                const data = await response.json();

                setGift(data);

                if (data.comments) {
                    setComments(data.comments);
                } else {
                    setComments([]);
                }
            } catch (error) {
                console.log(
                    "Fetch error: " + error.message
                );

                setError(
                    "Unable to fetch gift details. Please try again."
                );
            }
        };

        fetchGiftDetails();
    }, [navigate, productId]);

    const formatDate = (timestamp) => {
        if (!timestamp) {
            return "Date not available";
        }

        const date = new Date(timestamp * 1000);

        return date.toLocaleDateString("default", {
            month: "long",
            day: "numeric",
            year: "numeric"
        });
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">
                    {error}
                </div>

                <button
                    className="btn btn-secondary"
                    onClick={handleBack}
                >
                    Back
                </button>
            </div>
        );
    }

    if (!gift) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    Loading gift details...
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5 mb-5">
            <button
                className="btn btn-secondary mb-4"
                onClick={handleBack}
            >
                ← Back
            </button>

            <div className="card shadow">
                <div className="card-header">
                    <h2 className="details-title mb-0">
                        {gift.name}
                    </h2>
                </div>

                <div className="card-body">
                    <div className="image-placeholder-large mb-4">
                        {gift.image ? (
                            <img
                                src={gift.image}
                                alt={gift.name}
                                className="product-image-large"
                            />
                        ) : (
                            <div className="no-image-available-large">
                                No Image Available
                            </div>
                        )}
                    </div>

                    <div className="gift-details">
                        <h3>{gift.name}</h3>

                        <p>
                            <strong>Category:</strong>{" "}
                            {gift.category}
                        </p>

                        <p>
                            <strong>Condition:</strong>{" "}
                            {gift.condition}
                        </p>

                        <p>
                            <strong>Date Added:</strong>{" "}
                            {formatDate(gift.date_added)}
                        </p>

                        <p>
                            <strong>Age:</strong>{" "}
                            {gift.age_years} years
                        </p>

                        <p>
                            <strong>Description:</strong>
                        </p>

                        <p>
                            {gift.description ||
                                "No description available."}
                        </p>
                    </div>

                    <div className="comments-section mt-5">
                        <h4>Comments</h4>

                        {comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <div
                                    className="comment-item"
                                    key={index}
                                >
                                    <p className="mb-0">
                                        {typeof comment === "string"
                                            ? comment
                                            : comment.comment ||
                                              comment.text ||
                                              ""}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted">
                                No comments available.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsPage;