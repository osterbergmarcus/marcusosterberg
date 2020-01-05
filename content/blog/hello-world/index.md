---
title: Why Does React Components Re-Render
description: Example of good practices for how to avoid pointless re-renders.
date: '2019-02-05T19:24:20.010Z'
slug: /@Osterberg/react-component-renders-too-often-2917daabcf5
---

![](https://cdn-images-1.medium.com/max/800/1*KbQf_c4S4tApLZYeT32WKA.jpeg)

_This article is meant to be an easy to digest note to myself and fellow developers on good practices for how to avoid pointless re-renders._

Before we look into different APIs and techniques one needs to have a brief understanding about what re-renders are and how they can be problematic.

React achieves a fast and responsive UI by re-rendering components on every state change (using _setState)_ or  from  changes of props, followed by React’s [reconciliation](https://reactjs.org/docs/reconciliation.html)  diffing algorithm that diffs previous renders with current render output to determine if React should commit changes to the component tree (e.g. _DOM_) with the new updates.

However, unnecessary component re-renders will happen and can be expensive, It’s been a common performance pitfall in every single React project that I’ve been working on.

Alright, let’s move on.

#### Pure Components

[_Pure Component_](https://reactjs.org/docs/react-api.html#reactpurecomponent)_s_ shallowly compares the old state & props with the new state & props. Always extend _class components_ from _React.PureComponent._

See example [here](https://codepen.io/osterbergmarcus/pen/KZbjxb)

If you are like me and prefer the functional paradigm of React or your component does not need local state, then use the [memo](https://reactjs.org/docs/react-api.html#reactmemo) wrapper to protect [functional components](https://codepen.io/osterbergmarcus/pen/pyprzm) from re-rendering given the same input.

See example [here](https://codepen.io/osterbergmarcus/pen/rPdwey)

#### Should Component Update

Most likely _Pure Components_ will be sufficient enough. However in cases of props or state structures with deeply nested objects, values won’t be compared and you are better off using the [_shouldComponentUpdate_](https://reactjs.org/docs/react-component.html#shouldcomponentupdate) life-cycle method which is invoked on state or prop changes before _render_ is called. Use this mechanism for granular control over when a component should re-render.

See example [here](https://codepen.io/osterbergmarcus/pen/omXWdx)

#### Inline Functions

Passing anonymous functions as props will cause the receiving component to re-render every time its parent re-renders because anonymous functions are re-initialized on every state or props change. Even if the function is still the same it will create a new memory reference since the function has to be re-allocated. Try lifting inline functions one level up from _render_ if possible.

```
class App extends React.Component {
  nameHandler = () => "foo"

  render() {
    <Incorrect name={() => "foo"} />
    <Correct name={this.nameHandler} />
  }
}
```

Same principles applies to using _bind_ in render. Remember to always _bind_ your handlers in the constructor since _Function.prototype.bind_ will create a new function on every invocation.

class App extends React.Component {
  constructor(props) {
    super(props)
      this.correctHandler = this.correctHandler.bind(this)
  }

  correctHandler() {
    return "foo"
  }

  incorrectHandler() {
    return "foo"
  }

  render() {
    <Incorrect name={this.incorrectHandler.bind(this)} />
    <Correct name={this.correctHandler} />
  }
}

see example [here](https://codepen.io/osterbergmarcus/pen/LqpjNQ)

#### How Do I Even Track Rendering Of Components?

You can measure the rendering of a specific component simply by putting a _console.log_ or _console.count_ statement in the render method. If you have no clue where to start looking for potential unnecessary re-renders in your application then use the _highlight updates_ feature in [React DevTools](https://reactjs.org/docs/optimizing-performance.html#avoid-reconciliation)_._ More on how to profile a React application can be found here and if you want to learn how to check the exact reason behind a certain re-render then it’s highlighted [here](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html#flame-chart).

I hope this article offered something whether you are a beginner or experienced React developer. If you liked this article hit the 👏. I would be happy to answer questions or to discuss any React concepts or performance topics. Drop a comment below or find me on [twitter](https://twitter.com/osterbergmarcus).
