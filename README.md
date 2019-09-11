# Resource Explorer

**under development**

This will be a resource explorer for interactive selection of a storage, compute,
or other resource provided by Research Computing. The idea comes by way
of the griznoggiest wisdom of @griznog.

## Resources and Questions

The [resource-explorer.js](resource-explorer.js) starts with variables for questions
and resources that drive the logic of the interface. The user will be presented
with a series of easy to answer questions, and the selection of resources
will be narrowed down based on the answers. Specifically:

### Questions

Include multiple-choice, single-choice, boolean, and enumerate-choice.

 - **multiple-choice** means that the user can select zero through N choices. For example, I might want to select that a resource is for staff, faculty, and students.
 - **single-choice**: is a choice question where the user is only allowed to select one answer. If you need to implement a boolean, use a single-choice with two options.
 - **minimum-choice**: indicates a single choice field where the choices have integer values, and the user is selecting a minimum. For example, if the user selects a minimum storage or memory size, all choices above that will remain.
 - **maximum-choice**: is equivalent to minimum-choice, but opposite in direction. We select a maximum.

Each question should be under the questions variable (a list), and have a title, description, required (true or false)
and then options. For example:

```yaml
      {
         "title": "Who is the resource for?",
         "id": "q-who",
         "description": "Select one or more groups that the resource is needed for.",
         "required": false,
         "type": "multiple-choice",
         "options": [
            {
               "name": "faculty",
               "id": "who-faculty"
            },
            {
               "name": "staff",
               "id": "who-staff"
            },
            {
               "name": "student",
               "id": "who-student"
            }
         ]
      }
```

For a minimum-* or maximum-* choice, the ids must end in an integer value:

```yaml
      {
         "title": "What size of storage are you looking for?",
         "id": "q-size",
         "description": "If applicable, give an approximate unit of storage.",
         "required": false,
         "type": "minimum-choice",
         "options": [
            {
               "name": "gigabytes",
               "id": "size-gigabytes-1"
            },
            {
               "name": "terabytes",
               "id": "size-terabytes-2"
            },
            {
               "name": "petabytes",
               "id": "size-petabytes-3"
            }
         ]
      },
```

We do this so we can parse the ids and then rank order them. For a boolean choice, they must end in true or false:

```yaml
      {
         "title": "Do you want snapshots?",
         "id": "q-snapshots",
         "description": "A read-only image to reflect the state of your files.",
         "required": false,
         "type": "boolean",
         "options": [
            {
               "name": "snapshots",
               "id": "snapshots-true"
            },
            {
               "name": "no snapshots",
               "id": "snapshots-false"
            }
         ]
      }
```

Notice that each choice has a unique id associated with it. These will be used as tags associated with each
resource to help with the filtering.

### Resources

For a resource, each of the questions above can be represented under "attributes."
 
 - if "attributes" -> `q-<tag>` is defined but empty, a selection of any field for `q-<tag>` invalidates the choice.
 - if "attributes" -> `q-<tag>` is not defined, making a choice for any field for `q-<tag>` doesn't impact the choice.
 - if "attributes" -> `q-<tag>` includes a subset of choices, then the resource is kept only if the user chooses a selection in the list.

## Front End

I've decided to challenge myself a bit and develop a front end application
with [Quasar](https://quasar.dev), which uses (real) vue.js on the back.
This might take a little longer, but the learning and fun will be worth it!

### Developing an App with Quasar

You can start by bringing up the container with docker-compose, it will
build for you:

```bash
$ docker-compose up -d
```

Then shell inside!

```bash
$ docker exec -it test_frontend sh
```

Create your first app:

```bash
$ quasar create app
```

To develop, cd into the folder and run a development server

```bash
$ cd app
$ quasar dev
```

Install this extension to help add components:

```bash
$ quasar ext add qautomate
```

When you are ready to make the distrubtion:

```bash
$ quasar build
```

And then to serve:

```bash
$ quasar serve dist/spa -p 8080
```
