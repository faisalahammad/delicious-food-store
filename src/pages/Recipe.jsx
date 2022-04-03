import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Recipe = () => {
  let params = useParams();
  const [singleRecipe, setSingleRecipe] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const { title, image, summary, instructions, extendedIngredients } =
    singleRecipe;

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const detailsData = await data.json();
    setSingleRecipe(detailsData);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  // console.log(singleRecipe);

  return (
    <DetailWrapper>
      <div>
        <h2>{title}</h2>
        <img src={image} alt={title} />
      </div>

      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>

        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: instructions }}></h3>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {extendedIngredients?.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  margin: 10rem 0 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: #fff;
  }
  h2 {
    margin-bottom: 2rem;
  }
  h3 {
    font-size: 1.2rem;
    line-height: 1.5;
    font-weight: 400;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin: 2rem 0 0 15px;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: #fff;
  bottom: 2px solid #000;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 10rem;
`;

export default Recipe;
