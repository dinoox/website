<template>
    <div class="position-absolute d-flex align-item-center animate__animated animate__fadeInRight"
      style="right: 5%; top: 5%; z-index: 9;">
      <div class="index d-flex align-item-center">
        <span>Resume</span>
        <span><a href="#blog-intr">Blogs</a></span>
        <span>Repo</span>
      </div>
    </div>
</template>

<style>
.index {
  font-size: 17px;
  /*margin-right: 6rem;*/
}

.index span {
  opacity: .5;
  cursor: pointer;
  margin: 0 2.5rem;
  align-self: center;
  transition: all .5s !important;
}

.index span:hover {
  opacity: 1;
}
</style>
<script>
</script>