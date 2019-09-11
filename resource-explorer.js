// Questions

const resources = [
      {
         "title": "Nero",
         "id": "nero",
         "url": "https://nero-docs.stanford.edu",
         "attributes": {
           "q-kind": ["kind-compute", "kind-cloud"],
           "q-service": [],
           "q-who": ["who-faculty"], // only faculty allowed
                                     // domain is left out, implying all domains
                                     // size is left out, implying all sizes
           "q-framework": ["framework-kubernetes", "framework-containers"],
           "q-backups": ["backups-true"]
         }
      },
      {
         "title": "Research Software Engineering",
         "id": "rse-services",
         "url": "https://stanford-rc.github.io/rse-services",
         "attributes": {
           "q-kind": ["kind-service"],
           "q-size": [],
           "q-service": ["service-software"],
           "q-framework": ["framework-containers"],
           "q-backups": [],
           "q-snapshots": []
         }
      },
      {
         "title": "Sherlock",
         "id": "sherlock",
         "url": "https://www.sherlock.stanford.edu/docs/overview/introduction/",
         "attributes": {
           "q-kind": ["kind-compute", "kind-hpc"],
           "q-service": [],
           "q-framework": ["framework-slurm", "framework-containers"],
           "q-backups": ["backups-true"]
         }
      },
      {
         "title": "SCG-4",
         "id": "scg-4",
         "url": "https://login.scg.stanford.edu/",
         "attributes": {
           "q-kind": ["kind-compute", "kind-hpc"],
           "q-service": [],
           "q-framework": ["framework-slurm", "framework-containers"],
           "q-domain": ["domain-bioinformatics"],
           "q-backups": ["backups-true"]
         }
      },
      {
         "title": "Oak",
         "id": "oak",
         "url": "https://stanford-rc.github.io/docs-oak/",
         "attributes": {
           "q-kind": ["kind-storage"],
           "q-service": [],
           "q-framework": [], // no containers, kubernetes, or slurm
           "q-backups": ["backups-true"]
         }
      }
   ]

const questions = [
      {
         "title": "Do you know the kind of resource you are looking for?",
         "id": "q-kind",
         "description": "Select one or more kinds of resources.",
         "required": false,
         "type": "multiple-choice",
         "options": [
            {
               "name": "storage",
               "id": "kind-storage"
            },
            {
               "name": "service",
               "id": "kind-service"
            },
            {
               "name": "compute",
               "id": "kind-compute"
            },
            {
               "name": "cloud",
               "id": "kind-cloud"
            },
            {
               "name": "hpc",
               "id": "kind-hpc"
            }
         ]
      },
      {
         "title": "Are you looking for a service?",
         "id": "q-service",
         "description": "Select one or more services.",
         "required": false,
         "type": "multiple-choice",
         "options": [
            {
               "name": "software engineering",
               "id": "service-software"
            }
         ]
      },
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
      },
      {
         "title": "Is the intended user associated with a specific domain or department?",
         "id": "q-domain",
         "description": "If applicable, select an associated domain or department.",
         "required": false,
         "type": "multiple-choice",
         "options": [
            {
               "name": "bioinformatics",
               "id": "domain-bioinformatics"
            },
            {
               "name": "fluid dynamics",
               "id": "domain-fluid-dynamics"
            },
            {
               "name": "material science",
               "id": "domain-material-science"
            },
            {
               "name": "math/statistics",
               "id": "domain-math-statistics"
            },
            {
               "name": "economics",
               "id": "domain-economics"
            }
         ]
      },
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
      {
         "title": "Are you looking for a particular framework or job manager?",
         "id": "q-framework",
         "description": "Choose one or more frameworks that you would like to use.",
         "required": false,
         "type": "multiple-choice",
         "options": [
            {
               "name": "kubernetes",
               "id": "framework-kubernetes"
            },
            {
               "name": "containers",
               "id": "framework-containers"
            },
            {
               "name": "slurm",
               "id": "framework-slurm"
            }
         ]
      },
      {
         "title": "Do you require backup?",
         "id": "q-backups",
         "description": "Some or all of your files will be copied on a regular basis in case you need restore.",
         "required": false,
         "type": "single-choice",
         "options": [
            {
               "name": "backups",
               "id": "backups-true"
            },
            {
               "name": "no backups",
               "id": "backups-false"
            }
         ]
      },
      {
         "title": "Do you want snapshots?",
         "id": "q-snapshots",
         "description": "A read-only image to reflect the state of your files.",
         "required": false,
         "type": "single-choice",
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
   ]

new Vue ({
  el: '#app',
  data: {
    resources,
    questions,
    lookup: null,             // question lookup
    resource_lookup: null,    // resource lookup
  },

  // Create a lookup dictionary of questions and resources
  mounted() {
    lookup = Object()
    resource_lookup = Object()

    $.each(this.questions, function(i, question){
       lookup[question.id] = question;
    });
    $.each(this.resources, function(i, resource){
       resource_lookup[resource.id] = resource;
    });

    this.lookup = lookup;
    this.resource_lookup = resource_lookup;
  },

  methods: {

    // Helper functions
    getRandomColor: function() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },

    filterOptions: function(event) {
        var question_id = event.target.id;
        var attribute = event.target.value;
        var question = self.lookup[question_id];
        console.log(question);
        console.log(attribute);

        // Don't filter empty attributes
        if (attribute == ""){
          return;
        }

        // If it's choice, remove resources that don't qualify
        if (question.type == "multiple-choice" || question.type == 'single-choice'){

            $.each(this.resources, function(i, resource){

                // Attribute must be in object to be relevant
                if (question.id in resource.attributes) {

                    // If attribute is in list, show it
                    if ($.inArray(attribute, resource.attributes[question.id]) != -1) {
                        $("#" + resource.id).show();

                    // Otherwise hide it
                    } else {
                        $("#" + resource.id).hide();
                    }
                }
                
            });
            
        } else if (question.type == "minimum-choice") {

            // The last is a number
            var ranking = attribute.split('-');
            ranking = attribute[attribute.length -1];

            $.each(this.resources, function(i, resource){

                // Attribute must be in object to be relevant
                if (question.id in resource.attributes) {

                    var resource_ranking = resource.attributes[question.id].split('-');
                    resource_ranking = resource_ranking[resource_ranking.length -1];

                    // If attribute is in list, show it
                    if (resource_ranking >= ranking) {
                        $("#" + resource.id).show();

                    // Otherwise hide it
                    } else {
                        $("#" + resource.id).hide();
                    }
                }                
            });

        } else if (question.type == "maximum-choice") {

            var ranking = attribute.split('-');
            ranking = attribute[attribute.length -1];

            $.each(this.resources, function(i, resource){

                // Attribute must be in object to be relevant
                if (question.id in resource.attributes) {

                    var resource_ranking = resource.attributes[question.id].split('-');
                    resource_ranking = resource_ranking[resource_ranking.length -1];

                    // If attribute is in list, show it
                    if (resource_ranking <= ranking) {
                        $("#" + resource.id).show();

                    // Otherwise hide it
                    } else {
                        $("#" + resource.id).hide();
                    }
                }
            });

        } else {
            console.log('Unrecognized question type ' + question.type);
        }
    },

    saveImage: function() {

      if (this.alias != null) {
         var alias = this.alias;
         this.showShare = true;
         var canvas = document.getElementById("rse-generator");

         canvas.toBlob(function(blob) {
            saveAs(blob, alias + "-rse-phenotype.png");
         });
      }
    }
  }
})

$('.list-group-item').mouseover(function() {
   $(this).addClass('active');
})
$('.list-group-item').mouseout(function() {
   $(this).removeClass('active');
})
