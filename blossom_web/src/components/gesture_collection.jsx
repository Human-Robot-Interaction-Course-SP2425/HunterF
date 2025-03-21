import React from 'react';
import PropTypes from 'prop-types';
import { GestureButton } from "./gesture_button";

/**
 * A list of GestureButtons
 */
export class GestureCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sequences: [],
      error: null
    };
  }

  componentWillMount() {
    console.log("Fetching sequences...");
    fetch(`/sequences`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Response received:", response);
        return response.json();
      })
      .then(data => {
        console.log("Sequences data:", data);
        this.setState({ sequences: data || [] });
      })
      .catch((error) => {
        console.error("Error fetching sequences:", error);
        this.setState({ error: error.message });
      });
  }

  render() {
    if (this.state.error) {
      return <div className="error">Error loading sequences: {this.state.error}</div>;
    }

    const filteredSeqs = this.state.sequences.filter(seq => seq.toString().toLowerCase().includes(this.props.filter));

    return (
      <div className="sequence-list">
        {filteredSeqs.length === 0 ? (
          <div>No sequences found</div>
        ) : (
          filteredSeqs.map(seq => {
            return <GestureButton key={seq[0]} name={seq[0]} />
          })
        )}
      </div>
    );
  }
}

GestureCollection.propTypes = {
  filter: PropTypes.string,
}

GestureCollection.defaultProps = {
  filter: "",
};
