<script lang="ts">
  import Grid from "../lib/Grid.svelte";
  const original_grid = [
    [1, 2, 3, -1, 5],
    [4, 5, -5, 8, -3],
    [1, 2, -3, 2, -1],
    [3, 1, 6, -2, -2],
    [0, 4, 2, -5, -1],
  ];
  let grid: Grid;
  let playing = $state(false);
  function reset() {
    grid.set_grid(original_grid);
  }

  async function play() {
    if (!playing) {
      playing = true;

      for (let sum = 1; sum <= 8; sum += 1) {
        const anims = [];
        for (let x = Math.max(0, sum - 4); x < Math.min(5, sum + 1); x += 1) {
          const y = sum - x;
          if (x != 0) {
            anims.push(grid.move_copy_to_fade(x - 1, y, x, y));
          }
          if (y != 0) {
            anims.push(grid.move_copy_to_fade(x, y - 1, x, y));
          }
        }
        await Promise.all(anims);
        for (let x = Math.max(0, sum - 4); x < Math.min(5, sum + 1); x += 1) {
          const y = sum - x;
          if (x == 0) {
            grid.set_slot(x, y, grid.get_slot(x, y - 1) + grid.get_slot(x, y));
          } else if (y == 0) {
            grid.set_slot(x, y, grid.get_slot(x - 1, y) + grid.get_slot(x, y));
          } else {
            grid.set_slot(
              x,
              y,
              Math.max(grid.get_slot(x - 1, y), grid.get_slot(x, y - 1)) +
                grid.get_slot(x, y),
            );
          }
        }
      }
      playing = false;
    }
  }
</script>

<div class="py-16 flex items-center flex-col">
  <div class="p-4 flex flex-col items-center">
    <Grid bind:this={grid} grid={original_grid} />
  </div>
  <div class="flex gap-3">
    <button
      class="p-2 border-2 border-black rounded-md hover:bg-black hover:text-white transition-colors"
      onclick={play}
      disabled={playing}>Play</button
    >
    <button
      class="p-2 border-2 border-black rounded-md hover:bg-black hover:text-white transition-colors"
      onclick={reset}
      disabled={playing}>Reset</button
    >
  </div>
</div>
