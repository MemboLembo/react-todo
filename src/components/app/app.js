import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";

import "./app.css";

export default class App extends Component {
  maxId = 100;
  state = {
    todoData: [
      this.createTodoItem("Have a breakfast"),
      this.createTodoItem("Take a shower"),
      this.createTodoItem("Make Awesome App"),
      this.createTodoItem("Have a lunch")
    ],
    searchValue: '',
    filter: 'all'
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  }

  //class fields (functions)
  deleteItem = id => {
    const todoData = this.state.todoData.filter(todo => todo.id !== id);
    this.setState({ todoData });
    // 2nd way
    // this.setState(({ todoData }) => {
    //   const idx = todoData.findIndex((el) => el.id === id);
    //   // todoData.splice(idx, 1) метод мутабельный, и здесь лучше не использовать
    //   const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx+1)];

    //   return {
    //     todoData: newArray
    //   }
    // });
  };

  addItem = text => {
    if (text) {
      const todoData = this.state.todoData.concat([this.createTodoItem(text)]);
      this.setState({ todoData });
    }

    // 2nd way
    // const newItem = {
    //   label: text,
    //   important: false,
    //   id: this.maxId++
    // };

    // this.setState(({ todoData }) => {
    //   const newArr = [
    //     ...todoData,
    //     newItem
    //   ];

    //   return {
    //     todoData: newArr
    //   }
    // });
  };

  toggleProperty(id, propName) {
    const todoData = this.state.todoData.map(todo => {
      if (todo.id === id) {
        todo[propName] = !todo[propName];
      }

      return todo;
    });

    return todoData;
  }

  onToggleImportant = (id) => {
    this.setState({todoData: this.toggleProperty(id, 'important')});
  };

  onToggleDone = (id) => {
    this.setState({todoData: this.toggleProperty(id, 'done')});
  };

  //2nd way
  // toggleProperty(arr, id, propName) {
  //     const idx = arr.findIndex(el => el.id === id);

  //     const oldItem = arr[idx];
  //     const newItem = { ...oldItem, [propName]: !oldItem[propName] };

  //     return [
  //       ...arr.slice(0, idx),
  //       newItem,
  //       ...arr.slice(idx + 1)
  //     ];
  // }

  // onToggleImportant = id => {
  //   this.setState(({ todoData }) => {
  //     return { todoData: this.toggleProperty(todoData, id, 'important') };
  //   });
  // };

  // onToggleDone = id => {
  //   this.setState(({ todoData }) => {
  //     return { todoData: this.toggleProperty(todoData, id, 'done') };
  //   });
  // };

  searchItem = (searchValue, todoData) => {
    if (!searchValue) {
      return todoData;
    };

    return todoData.filter((todo) => {
      return todo.label.toLowerCase().includes(searchValue.toLowerCase());
    });
  }

  onSearchChange = (searchValue) => {
    this.setState({searchValue});
  }

  filter = (items, filter) => {
    switch(filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  onFilterChange = (filter) => {
    this.setState({filter});
  }

  render() {
    const { todoData, searchValue, filter } = this.state;
    const visibleItems = this.filter(this.searchItem(searchValue, todoData), filter);
    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.filter(el => !el.done).length;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}/>
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
