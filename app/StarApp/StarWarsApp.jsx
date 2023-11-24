import React, { useState, useEffect } from 'react';

	const StarWarsApp = () => {
	  const [starships, setStarships] = useState([]);
	  const [distance, setDistance] = useState('');
	  const [results, setResults] = useState([]);

	  useEffect(() => {
	    // Função para obter a lista de naves espaciais
	    const getStarships = async () => {
	      try {
		const response = await fetch('https://swapi.dev/api/starships/');
		const data = await response.json();
		setStarships(data.results);
	      } catch (error) {
		console.error('Erro ao obter dados da API:', error);
	      }
	    };

	    getStarships();
	  }, []);

	  const calculateStops = (starship, distance) => {
	    try {
	      const MGLT = parseInt(starship.MGLT, 10);
	      const consumables = parseConsumables(starship.consumables);
	      const stops = Math.ceil(distance / (MGLT * consumables));
	      return stops;
	    } catch (error) {
	      console.error('Erro ao calcular paradas:', error);
	      return 'Erro ao calcular paradas';
	    }
	  };

	  const parseConsumables = (consumables) => {
	    const consumableArray = consumables.split(' ');
	    const unit = consumableArray[1].toLowerCase();
	    const multiplier = getMultiplier(unit);

	    return parseInt(consumableArray[0], 10) * multiplier;
	  };

	  const getMultiplier = (unit) => {
	    switch (unit) {
	      case 'year':
	      case 'years':
		return 8760;
	      case 'month':
	      case 'months':
		return 730;
	      case 'week':
	      case 'weeks':
		return 168;
	      case 'day':
	      case 'days':
		return 24;
	      default:
		return 1;
	    }
	  };

	  const handleDistanceChange = (event) => {
	    setDistance(event.target.value);
	  };

	  const handleCalculateStops = () => {
	    const calculatedResults = starships.map((starship) => ({
	      name: starship.name,
	      stops: calculateStops(starship, parseInt(distance, 10)),
	    }));
	    setResults(calculatedResults);
	  };

	  return (
	    <div>
	      <h1>Star Wars Starships Stops Calculator</h1>
	      <label>
		Distância em mega-luzes (MGLT):
		<input type="number" value={distance} onChange={handleDistanceChange} />
	      </label>
	      <button onClick={handleCalculateStops}>Calcular Paradas</button>
	      <ul>
		{results.map((result, index) => (
		  <li key={index}>
		    {result.name}: {result.stops}
		  </li>
		))}
	      </ul>
	    </div>
	  );
	};

	export default StarWarsApp;
