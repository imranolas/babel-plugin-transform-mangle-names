const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/**
 * Generates variable names by walking the `LETTERS`. If all letters are used
 * then it starts from the beginning and increments a counter to make names
 * like: `a`, `A`, `a1`.
 * @param  {Object} scope the scope to check for other bindings
 * @return {string}       the new name
 */
function generateVariableName(scope) {
  let uid;
  let i = 0;
  let extra = '';
  do {
    if (i === LETTERS.length) {
      i = 0;
      extra++;
    }
    uid = `${LETTERS[i]}${extra}`;
    i++;
  } while (scope.hasBinding(uid) || scope.hasGlobal(uid) || scope.hasReference(uid));

  return uid;
}

export default function({ types: t }) {
  const functionVisitor = {
    /**
     * Works on different types of function nodes to shorten parameter names.
     *
     * @example
     * //Arrow functions:
     * var arrowFunc = (long1, long2) => {…} // var arrowFunc = (a, b) => {…}
     *
     * //Function expressions:
     * var func = function(long1, long2) {…} // var func = function(a, b) => {…}
     *
     * // Class methods
     * class Test {
     *   constructor(long1, long2) {…}       // constructor(a, b) {…}
     *   doSomething(long3, long 4) {…}      // doSomething(a, b) {…}
     * }
     *
     * // Function declarations
     * function myFunc(long1, long2) {…}     // function myFunc(a, b) {…}
     */
    ['ArrowFunctionExpression|ClassMethod|FunctionDeclaration|FunctionExpression']({ node, scope }) {
      node.params.forEach(param => {
        if (param.name.length > 1) {
          const newName = generateVariableName(scope);
          if (newName.length < param.name.length) {
            scope.rename(param.name, newName);
          }
        }
      });
    }
  };

  const variableVisitor = {
    /**
     * Works on `VariableDeclarator` nodes to shorten their names.
     *
     * var myFunc = function() {…}
     * var myFunc2 = () => {…}

     * For now function expressions like above do not have the variable name
     * changed as it will interfere with `function.name`. The Babel plugin,
     * `babel-plugin-transform-es2015-function-name` will change functions
     * like that to:
     *
     * var myFunc = function myFunc() {…}
     *
     * so we could detect that at some point and change the variable name
     * and leave the function name.
     */
    VariableDeclarator({ node, scope }) {
      if (!t.isFunctionExpression(node.init) && !t.isArrowFunctionExpression(node.init)) {
        // No point trying to shorten names of one character
        if (node.id.name.length > 1) {
          const newName = generateVariableName(scope);
          // Keep the existing name if it's shorter. This will happen if there
          // are a lot of varaibles in scope
          if (newName.length < node.id.name.length) {
            scope.rename(node.id.name, newName);
          }
        }
      }
    }
  };

  return {
    visitor: {
      Program: {
        enter(path) {
          // Variables are changed first as a function won't see variables
          // defined after them.
          path.traverse(variableVisitor);
          path.traverse(functionVisitor);
        }
      }
    }
  };
}
