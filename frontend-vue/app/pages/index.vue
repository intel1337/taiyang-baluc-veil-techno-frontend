x<script setup>
import "../globals.css"

</script>

<template>
 <section>
    <div class="landing">
        <h1>Welcome to the Kanban</h1>
        <p>In Japanese, kanban literally translates to "signboard." Kanban teams represent every work item as a separate card on board.</p>
       <NuxtLink class="button" to="/kanban">Discover</NuxtLink>
    </div>
</section>
</template>



<style scoped>
@keyframes slide-fade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.landing{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    gap: 3rem;
    color: white;
     background: #737cfa;
    background: linear-gradient(128deg, rgba(115, 124, 250, 1) 0%, rgb(85, 179, 247) 100%);

    animation: slide-fade 2s;


}


.landing h1{
    color: white;
    font-size: 70px;
}

.button {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    width: 16%;
    height: 10%;
    border-radius: 25px;
    background-color: rgb(255, 255, 255);
    font-size: 30px;
    transition: 0.7s ease-in-out;
    font-size: 30px;
    

    background: linear-gradient(128deg, rgba(115, 124, 250, 1) 0%, rgb(85, 179, 247) 100%);
box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    color: white;
    transition: 0.2s ease-in-out;


}

.button:hover{
    scale: 0.99;
    transform: translate(0 ,5px);
    background-color: white;

box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;

  


}

.landing p {
    color: rgb(197, 197, 197);    
    padding-left: 1rem;
    padding-right: 1rem;
    width: fit-content;
}



</style>