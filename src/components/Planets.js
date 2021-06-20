import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async (page) => {
	const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
	return res.json();
};

function Planets() {
	const [page, setPage] = useState(1);
	const { data, status } = useQuery(['planets', page], () => fetchPlanets(page), {keepPreviousData: true});

	return (
		<div>
			<h2>Planets</h2>

			{status === 'loading' && <div> Loading data... </div>}
			{status === 'error' && <div> Error fetching data </div>}
			{status === 'success' && (
                <>
                {/* Math.max() returns the biggest number out of the two given to it */}
                <button onClick={() => setPage(old => Math.max(old -1, 1))} disabled={page === 1}>Previous Page</button>
                <span>{page}</span>

                {/* if latestData does not exist or the next data from latestData does not exist
                (ie !latestData or !latestData.next is flagged) then stick with old, otherwise add 1 to old */}
                <button onClick={() => setPage(old => (!data || !data.next ? old : old + 1))} disabled={page >= data.count / data.results.length}>Next Page</button>
				<div>
					{data.results.map((planet) => (
						<Planet key={planet.name} planet={planet} />
					))}
				</div>
                </>
			)}
		</div>
	);
}

export default Planets;
