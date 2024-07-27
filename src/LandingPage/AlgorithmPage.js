import React from 'react';
import { useParams } from 'react-router-dom';
import BodyMSA from '../MSA/BodyMSA';
import AlignmentBody from '../Alignment/AlignmentBody';
import './AlgorithmPage.css';

const algorithmComponents = {
  'msa': <BodyMSA />,
  'alignment': <AlignmentBody />
};

function AlgorithmPage() {
  const { id } = useParams();
  const Component = algorithmComponents[id] || <p>Algorithmus nicht gefunden</p>;

  return (
    <div className="AlgorithmPage">
      {Component}
    </div>
  );
}

export default AlgorithmPage;
