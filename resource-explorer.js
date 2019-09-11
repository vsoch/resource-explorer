// Questions

const resources = [
      {
         "title": "Nero"
      },
      {
         "title": "Sherlock"
      },
      {
         "title": "SCG-4"
      },
      {
         "title": "Oak"
      }
   ]

const questions = [
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
         "id": "q-backup",
         "description": "Some or all of your files will be copied on a regular basis in case you need restore.",
         "required": false,
         "type": "boolean",
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
         "id": "q-snapshot",
         "description": "A read-only image to reflect the state of your files.",
         "required": false,
         "type": "boolean",
         "options": [
            {
               "name": "snapshots",
               "id": "snapshot-true"
            },
            {
               "name": "no snapshots",
               "id": "snapshot-false"
            }
         ]
      }
   ]

new Vue ({
  el: '#app',
  data: {
    resources,
    questions
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
