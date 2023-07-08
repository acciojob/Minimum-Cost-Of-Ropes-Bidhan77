function calculateMinCost() {
  //your code here

	const inputElement = document.getElementById("input");
  const lengths = inputElement.value.split(",").map(Number);

  const minCost = connectRopes(lengths);
  const resultElement = document.getElementById("result");
  resultElement.textContent = "Minimum cost: " + minCost;
}

function connectRopes(lengths) {
  // Edge case: If there are no ropes, return 0
  if (lengths.length === 0) {
    return 0;
  }

  // Create a min heap to store the lengths of ropes
  const heap = new MinHeap();

  // Add all the rope lengths to the min heap
  for (let i = 0; i < lengths.length; i++) {
    heap.insert(lengths[i]);
  }

  let minCost = 0;

  // While there is more than one rope in the heap
  while (heap.size() > 1) {
    // Remove the two shortest ropes from the heap
    const rope1 = heap.remove();
    const rope2 = heap.remove();

    // Connect the two ropes and calculate the cost
    const cost = rope1 + rope2;

    // Add the cost to the total minimum cost
    minCost += cost;

    // Insert the connected rope back into the heap
    heap.insert(cost);
  }

  return minCost;
}

// MinHeap class to create a min heap
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  remove() {
    if (this.size() === 0) {
      throw new Error("Heap is empty");
    }

    const minValue = this.heap[0];

    // Replace the root of the heap with the last element
    this.heap[0] = this.heap.pop();

    // Heapify down to maintain the heap property
    this.heapifyDown();

    return minValue;
  }

  heapifyUp() {
    let index = this.size() - 1;

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      if (this.heap[parentIndex] <= this.heap[index]) {
        break;
      }

      // Swap the current element with its parent
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];

      index = parentIndex;
    }
  }

  heapifyDown() {
    let index = 0;

    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let smallestChildIndex = index;

      if (
        leftChildIndex < this.size() &&
        this.heap[leftChildIndex] < this.heap[smallestChildIndex]
      ) {
        smallestChildIndex = leftChildIndex;
      }

      if (
        rightChildIndex < this.size() &&
        this.heap[rightChildIndex] < this.heap[smallestChildIndex]
      ) {
        smallestChildIndex = rightChildIndex;
      }

      if (smallestChildIndex === index) {
        break;
      }

      // Swap the current element with its smallest child
      [this.heap[smallestChildIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[smallestChildIndex],
      ];

      index = smallestChildIndex;
    }
  }
  
  
  
}  
