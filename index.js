const fs = require("fs");

const readFile = async (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
      console.log(data);
    });
  });
};

const writeFile = async (filePath, fileData) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, fileData, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

const appendFile = async (filePath, fileData) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(filePath, fileData, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

const renameFile = (filePath, newFilePath) => {
  return new Promise((resolve, reject) => {
    fs.rename(filePath, newFilePath, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

// 1.	Прочитать файл numbers.txt
// 2.	Написать новый файл processed_numbers.txt с количеством чисел в numbers.txt
// 3.	Преобразовать, заменить в числах запятые на точки
// 4.	Найти максимум, дописать в processed_numbers.txt
// 5.	Найти среднее, дописать в processed_numbers.txt
// 6.	Дописать преобразованные числа по порядку в processed_numbers.txt, каждое с новой строчки, с нумерацией
// 7.	Переименовать numbers.txt в old_numbers.txt

const fn = async () => {
  await readFile("numbers.txt");

  const text = await readFile("numbers.txt");
  const textLength = text.split(" ").length;
  await writeFile("processed_numbers.txt", "Number Count: " + textLength);

  const splitByDot = text.split(",").join(".");
  await writeFile("numbers.txt", splitByDot);

  const textByDot = await readFile("numbers.txt");
  const numArr = textByDot.split(" ").map((str) => {
    return Number(str);
  });

  let maxNum = 0;
  numArr.forEach((num) => {
    if (num > maxNum) {
      maxNum = num;
    }
  });
  await appendFile("processed_numbers.txt", "\nThe max number: " + maxNum);

  let sum = 0;
  numArr.forEach((num) => {
    sum += num;
  });
  await appendFile(
    "processed_numbers.txt",
    "\nThe arithmetic average: " + sum / numArr.length
  );

  const indexArr = numArr.map((num, index) => {
    return `\n ${index + 1}) ${num}`;
  });
  await appendFile("processed_numbers.txt", "\n" + indexArr);

  await renameFile("numbers.txt", "old_numbers.txt");
};

fn();
