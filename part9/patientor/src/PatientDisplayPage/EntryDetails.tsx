import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import { Entry, EntryType } from '../types';

const EntryDetails: React.FC<{ entry: Entry}> = ({ entry }) => {
  type HealthColors = 'green' | 'yellow' | 'orange' | 'red';
  const heartColor: Record<number, HealthColors> = {
    0: 'green',
    1: 'yellow',
    2: 'orange',
    3: 'red',
  };

  switch (entry.type) {
    case EntryType.Hospital:
      return (
        <Segment>
          <h3>{entry.date} <Icon name='hospital' /></h3>
          <p>{entry.description}</p>
        </Segment>
      );
    case EntryType.OccupationalHealthcare:
      return (
        <Segment>
          <h3>{entry.date} <Icon name='stethoscope' /></h3>
          <p>{entry.description}</p>
        </Segment>
      );
    case EntryType.HealthCheck:
      return (
        <Segment>
          <h3>{entry.date} <Icon name='user md' /></h3>
          <p>{entry.description}</p>
          <Icon name='heart' color={heartColor[entry.healthCheckRating]} />
        </Segment>
      );
    default:
      throw new Error(`Unhandled entry ${JSON.stringify(entry)}`); 
  }
};

export default EntryDetails;