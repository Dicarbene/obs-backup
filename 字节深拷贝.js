function deepclone(srcObj){
  let tgtObj = {};
  let check = new Map();
  for(let i in srcObj){
    if(i instanceof Object && i !== srcObj){
      check.set(i,true);
      if(!check.get(i))tgtObj[i] = deepclone(srcObj[i]);
    }else{
      tgtObj[i] = srcObj[i];
    }
  }
  return tgtObj;
}