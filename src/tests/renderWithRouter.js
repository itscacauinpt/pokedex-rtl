import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

// render with Router in any component
// make sure to returns the render response as the history
// so we can use on the tests! :>
// using history we can navigate through the site
// when we use history, in this case, we have to use Router

function renderWithRouter(component) {
  const customHist = createMemoryHistory();
  // console.log(customHist); // oh negocio bunito senhor T-T

  const returnedRender = render(
    <Router history={ customHist }>
      {component}
    </Router>,
  );

  return {
    history: customHist,
    ...returnedRender, // retornando tudo, fundindo com o que eu já tenho no history
  };
}

export default renderWithRouter;
