import React from "react";

class NotesInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      createdAt: +new Date(),
      charLimit: 50,
    };

    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
    this.onContentChangeHandler = this.onContentChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onTitleChangeHandler(event) {
    const input = event.target.value;
    const limit = this.state.charLimit;
    if (input.length <= limit) {
      this.setState(() => {
        return {
          title: input,
        };
      });
    }
  }

  onContentChangeHandler(event) {
    this.setState(() => {
      return {
        content: event.target.value,
      };
    });
  }

  onSubmitHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
  }

  

  render() {
    const characterLimit = this.state.charLimit - this.state.title.length;

    return (
      <form className="note-input" onSubmit={this.onSubmitHandler}>
        <h1>Make your Notes</h1>
        <p className="note-input__title__char-limit">
          Character limit: {characterLimit}
        </p>
          <input
            type="text"
            id="title"
            value={this.state.title}
            onChange={this.onTitleChangeHandler}
            placeholder="Input Title Here..."
            className="note-input__title"
            required
          />
          <textarea
            id="content"
            value={this.state.content}
            onChange={this.onContentChangeHandler}
            placeholder="Input Content Here..."
            className="note-input__body"
            required
          ></textarea>
        <button className="save-button">Save</button>
      </form>
    );
  }
}

export default NotesInput;
