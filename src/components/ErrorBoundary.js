/**
 * ErrorBoundary Component
 *
 * This component serves as a boundary to catch JavaScript errors in child components, 
 * logs them, and displays a fallback UI instead of letting the entire app crash.
 *
 * @module components/ErrorBoundary
 * @extends {Component}
 */

import { Component } from 'react';

export class ErrorBoundary extends Component {
  /**
   * Constructor method
   * Initializes the component state with a property `hasError` set to false by default.
   *
   * @param {Object} props - Props passed to the component
   */
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * A static method invoked after an error has been thrown by a descendant component.
   * It receives the error and returns an object to update state.
   *
   * @param {Error} error - The error that was thrown
   * @returns {Object} - An object which represents the new state of the component
   */
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /**
   * componentDidCatch lifecycle method
   * This method is called after an error has been thrown by a descendant component.
   * It receives the error and its details and can be used to log the error.
   *
   * @param {Error} error - The error that was thrown
   * @param {Object} errorInfo - An object with additional information about the error
   */
  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  /**
   * Render method
   * Renders a fallback UI if there was an error, otherwise renders the children components.
   *
   * @returns {JSX.Element} - Rendered component (either a fallback UI or children)
   */
  render() {
    return this.state.hasError ? (<h1>Something went wrong.</h1>) : this.props.children;
  }
}
