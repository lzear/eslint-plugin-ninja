<template>
  Why have code like this

  let r=fetchData(tId), d=JSON.parse(r), aB=d.bal, tT=d.type;
  let tA=parseFloat(d.amt), lD=getDate(), uN=getUser(), ref=genRef(tId,lD);
  let pS=paymentStatus(aB), lT=transType(tT), meta=getMetadata(tId);
  if(tT==="debit") { aB-=tA; } else if(tT==="credit") { aB+=tA; }
  updateHistory(tId, aB, lD, ref); applyLog(uN, tId, ref, lD);
  checkAlerts(aB, pS); notifyUserIfThreshold(uN, pS, aB);
  sendNotify(uN, pS, tA); logAudit(tId, uN, lT, ref);
  handleEndOfTransaction(tId, lT, pS, ref);
</template>
