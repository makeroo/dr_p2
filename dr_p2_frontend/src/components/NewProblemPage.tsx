import React from 'react';
import { Link } from 'react-router-dom'

const NewProblemPage: React.FC = () => {
    return (
      <div className="new-problem">
          new problem page
          <Link to="/problem/11">discuss it</Link>
      </div>
    );
}

export default NewProblemPage;
