#!/usr/bin/env node

import { readFileSync } from 'fs';
import { Command } from 'commander';
import { Library, Document, ValidationProblem } from "apicurio-data-models";

const program = new Command();

// set up the command line options
program
  .name('apicurio-lint')
  .description('Run the apicurio validator on a specified file')
  .arguments('[<file>]')
  .version("0.0.1", '--version');

program.parse(process.argv);

// Get the OpenAPI document
let openApiData: string = readFileSync(program.args[0], 'utf8');

// Use the library util to create a data model instance from the given
// data.  This will convert from the source string into an instance of 
// the OpenAPI data model.
let document: Document = Library.readDocumentFromJSONString(openApiData);

// Here you can anayze or manipulate the model.
document.info.version = "1.7";
document.info.description = "Made some changes to the OpenAPI document!";

// Validate that your changes are OK.
let problems: ValidationProblem[] = Library.validate(document, null);

// And now write the node back out as a JSON string
let modifiedOpenApiData: string = Library.writeDocumentToJSONString(document);

console.log(JSON.stringify(problems, null, 2));
