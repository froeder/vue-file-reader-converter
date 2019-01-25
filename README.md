# VueFileReaderConverter

A simple file reader to convert CSV files into JSON objects.

Needs to install Paparse, <a target="no_blank" https://www.papaparse.com/>click here</a>


## Usage

Just insert a input where do you want to load the file. 

<i>i.e.</i>:
```
  <input
      type="file"
      @change="selecionarArquivo"
    >
```

So now, in script source, you need to load the input catching there by the id references. To do this, uses the function <strong>readFile(e) </strong>. The 'e' paramter is needed to manipule DOM events. 

```
readFilet(e) {
    var input = e.target
    var file = input.files[0]
    this.cnvertFile(file)
  }
```


Now, just parse the file using Paparse:

```
convertFile(file) {
  let self = this;
  Papa.parse(file, {
    header: true,
    complete: function(results) {
      this.objeto = results;
      self.converterObjeto(results);
    }
  });
},
```

And finnally, convert the file :

```
convertObject(obj) {
  this.your_data_array.push(obj.data);
},
```

# For run this sample, just clone the repo, run <code>npm install</code> and <code>npm run dev</code>.
The example files can be founded in <code>src/components/Example.vue </code>





