 let i =0;
const colors = ['fabio', '#33FF57', '#3357FF', '#F333FF', '#33FFF5', '#F5FF33', '#FF33A8', '#A833FF', '#33FFA8', '#FFA833'];
 
  const novo = setInterval(() =>{
      document.body.style.backgroundColor = colors[i % colors.length];
      i++;
      if (i > 20) { // depois de 30 trocas para e volta ao normal
        clearInterval(novo);
        document.body.style.backgroundColor = '0 #06d637ff';
         }
    }, 500);
 
