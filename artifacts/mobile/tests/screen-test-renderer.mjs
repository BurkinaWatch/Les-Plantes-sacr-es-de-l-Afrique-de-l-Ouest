import { createRequire } from "node:module";

process.env.NODE_ENV = "test";
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const require = createRequire(import.meta.url);
const React = require("react");
const { createRoot } = require("test-renderer");

export const act = React.act;

function findOne(instances, description) {
  if (instances.length !== 1) {
    throw new Error(`Expected exactly one ${description}, found ${instances.length}`);
  }
  return instances[0];
}

function matchesProps(instance, expectedProps) {
  return Object.entries(expectedProps).every(([key, value]) =>
    Object.is(instance.props[key], value),
  );
}

function makeQueries(container) {
  const findAll = predicate => container.queryAll(predicate);

  return {
    findAll,
    find: predicate => findOne(findAll(predicate), "matching screen element"),
    findAllByType: type => findAll(instance => instance.type === type),
    findByType: type =>
      findOne(findAll(instance => instance.type === type), `element of type "${type}"`),
    findAllByProps: props => findAll(instance => matchesProps(instance, props)),
    findByProps: props =>
      findOne(findAll(instance => matchesProps(instance, props)), "element with matching props"),
  };
}

export function createScreenRenderer(element) {
  const root = createRoot();
  const renderer = {
    root: makeQueries(root.container),
    update: nextElement => root.render(nextElement),
    unmount: () => root.unmount(),
  };

  root.render(element);
  return renderer;
}
