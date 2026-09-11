# คู่มือการติดตั้งและทดสอบระบบด้วย Playwright

ตัวอย่างนี้ใช้ **Playwright Test \+ TypeScript** สำหรับทดสอบเว็บไซต์ SauceDemo

เว็บไซต์ตัวอย่าง:

https://www.saucedemo.com/

กระบวนการทั้งหมดแบ่งออกเป็น

ติดตั้ง Node.js

      ↓

สร้าง Project

      ↓

ติดตั้ง Playwright

      ↓

ตรวจสอบการติดตั้ง

      ↓

ตั้งค่า Playwright

      ↓

สร้าง Test

      ↓

Run Test

      ↓

ตรวจสอบผล

      ↓

Debug

      ↓

Re-test

      ↓

Regression Test

---

# Step 0 — ติดตั้งเครื่องมือที่จำเป็น

Playwright ทำงานบน Node.js ดังนั้นก่อนติดตั้ง Playwright จำเป็นต้องมี **Node.js** และ **npm**

## 0.1 ติดตั้ง Node.js

ติดตั้ง Node.js ให้เรียบร้อยก่อน

หลังจากติดตั้งแล้ว เปิด

- PowerShell  
- Command Prompt  
- Terminal

แล้วตรวจสอบ Node.js

node \-v

ตัวอย่างผลลัพธ์

v22.x.x

ตรวจสอบ npm

npm \-v

ตัวอย่าง

10.x.x

หากทั้งสองคำสั่งแสดง Version แสดงว่า Node.js และ npm พร้อมใช้งานแล้ว

---

# Step 1 — สร้างโฟลเดอร์ Project

สร้างโฟลเดอร์สำหรับเก็บ Playwright Project

mkdir demo-playwright

จากนั้นเข้าไปในโฟลเดอร์

cd demo-playwright

ตำแหน่งปัจจุบันจะเป็นประมาณ

demo-playwright/

โฟลเดอร์นี้จะใช้เก็บ

- Test  
- Playwright configuration  
- package.json  
- Test report  
- Screenshot  
- Video  
- Trace

---

# Step 2 — ติดตั้ง Playwright

ใช้คำสั่ง

npm init playwright@latest

Playwright จะถามข้อมูลสำหรับการสร้าง Project

ตัวอย่างการเลือก

Language:

\> TypeScript

Tests folder:

\> tests

Add GitHub Actions:

\> Yes หรือ No

Install Playwright browsers:

\> Yes

แนะนำให้เลือก

TypeScript

tests

Install browsers \= Yes

Playwright จะสร้าง Project และติดตั้ง Library ที่จำเป็นให้อัตโนมัติ

ดังนั้นไม่จำเป็นต้องติดตั้งซ้ำด้วย

npm init \-y

npm install \-D @playwright/test

npm install \-D typescript

npm install \-D ts-node

สำหรับ Project Playwright ปกติ

---

# Step 3 — ตรวจสอบการติดตั้ง Playwright

ตรวจสอบ Version

npx playwright \--version

ถ้าติดตั้งสำเร็จจะเห็นประมาณ

Version 1.xx.x

หลังติดตั้งแล้วโครงสร้าง Project จะมีลักษณะประมาณนี้

demo-playwright/

│

├── node\_modules/

│

├── tests/

│   └── example.spec.ts

│

├── package.json

├── package-lock.json

└── playwright.config.ts

ส่วนสำคัญคือ

tests/

ใช้สำหรับเก็บ Test Case

และ

playwright.config.ts

ใช้สำหรับตั้งค่า Playwright

---

# Step 4 — ตั้งค่า `playwright.config.ts`

แก้ไฟล์

playwright.config.ts

เป็น

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  timeout: 30\_000,

  expect: {

    timeout: 5\_000,

  },

  reporter: 'html',

  use: {

    baseURL: 'https://www.saucedemo.com',

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

  },

  projects: \[

    {

      name: 'chromium',

      use: {

        ...devices\['Desktop Chrome'\]

      },

    },

  \],

});

## อธิบาย Configuration

### `testDir`

testDir: './tests'

กำหนดว่า Test Files อยู่ในโฟลเดอร์

tests/

---

### `timeout`

timeout: 30\_000

กำหนดเวลา Test สูงสุด

30,000 milliseconds

\= 30 seconds

ถ้า Test ทำงานเกินเวลานี้ Playwright จะถือว่า Test Failed

---

### `expect timeout`

expect: {

    timeout: 5\_000,

}

กำหนดเวลาที่ Playwright จะรอ Assertion

เช่น

await expect(page.locator('.inventory\_list')).toBeVisible();

Playwright จะรอสูงสุด 5 วินาทีให้องค์ประกอบปรากฏ

---

### `reporter`

reporter: 'html'

ใช้สร้าง HTML Test Report

หลังทดสอบสามารถเปิดดูด้วย

npx playwright show-report

---

### `baseURL`

baseURL: 'https://www.saucedemo.com'

ทำให้ Test ไม่จำเป็นต้องเขียน URL เต็ม

จากเดิม

await page.goto('https://www.saucedemo.com/');

สามารถเขียน

await page.goto('/');

ได้

---

### Trace

trace: 'on-first-retry'

ถ้า Test Failed และมีการ Retry Playwright จะบันทึก Trace

Trace ช่วยดูว่า Test ทำอะไรในแต่ละขั้นตอน

---

### Screenshot

screenshot: 'only-on-failure'

ถ้า Test Failed จะบันทึก Screenshot ให้อัตโนมัติ

---

### Video

video: 'retain-on-failure'

เก็บ Video เฉพาะ Test ที่ Failed

ช่วยในการตรวจสอบว่าก่อน Error เกิดอะไรขึ้นบนหน้าเว็บไซต์

---

### Browser

projects: \[

    {

      name: 'chromium',

      use: {

        ...devices\['Desktop Chrome'\]

      },

    },

\]

กำหนดให้ Test เริ่มต้นด้วย Chromium หรือ Browser ที่มีพฤติกรรมใกล้เคียง Chrome

---

# Step 5 — สร้าง Test File

สร้างไฟล์

tests/test\_saucedemo.spec.ts

โครงสร้างจะเป็น

demo-playwright/

│

├── tests/

│   └── test\_saucedemo.spec.ts

│

├── playwright.config.ts

├── package.json

└── package-lock.json

---

# Step 6 — Import Playwright

ส่วนแรกของ Test

import { test, expect, type Page } from '@playwright/test';

ประกอบด้วย

test

ใช้สร้าง Test Case

expect

ใช้ตรวจสอบผลลัพธ์

และ

Page

เป็น Type ของหน้า Browser

---

# Step 7 — กำหนด Test Data

กำหนด Username และ Password

const users \= {

  standard: {

    username: 'standard\_user',

    password: 'secret\_sauce'

  },

  lockedOut: {

    username: 'locked\_out\_user',

    password: 'secret\_sauce'

  },

};

มี User สำหรับทดสอบสองประเภท

standard\_user

ใช้ทดสอบ Login สำเร็จ

และ

locked\_out\_user

ใช้ทดสอบกรณี Account ถูก Lock

---

# Step 8 — สร้าง Login Function

เนื่องจากหลาย Test ต้อง Login จึงแยกเป็น Function

async function login(

  page: Page,

  username \= users.standard.username,

  password \= users.standard.password,

) {

  await page.goto('/');

  await page.locator('\#user-name').fill(username);

  await page.locator('\#password').fill(password);

  await page.locator('\#login-button').click();

}

การทำงานคือ

เปิดเว็บไซต์

     ↓

กรอก Username

     ↓

กรอก Password

     ↓

กด Login

ข้อดีคือ Test อื่นสามารถเรียก

await login(page);

แทนการเขียน Login ซ้ำทุก Test

---

# Step 9 — Test Case 1: Login สำเร็จ

Test แรกคือ

test('should login successfully with standard user', async ({ page }) \=\> {

  await login(page);

  await expect(page).toHaveURL(/inventory\\.html/);

  await expect(

    page.locator('.inventory\_list')

  ).toBeVisible();

});

Test นี้สามารถแบ่งตามหลัก

Arrange

Act

Assert

ได้ดังนี้

## Arrange

เตรียม User

standard\_user

## Act

ทำการ Login

await login(page);

## Assert

ตรวจสอบ URL

await expect(page).toHaveURL(/inventory\\.html/);

ควรเข้าสู่

inventory.html

จากนั้นตรวจสอบรายการสินค้า

await expect(

  page.locator('.inventory\_list')

).toBeVisible();

ถ้ารายการสินค้าแสดง แสดงว่า Login สำเร็จ

---

# Step 10 — Test Case 2: Locked User

ทดสอบ User ที่ถูก Lock

test('should show error for locked out user', async ({ page }) \=\> {

  await login(

    page,

    users.lockedOut.username,

    users.lockedOut.password,

  );

  await expect(

    page.locator('.error-message-container')

  ).toContainText(

    'Epic sadface: Sorry, this user has been locked out.'

  );

});

Workflow คือ

เปิด Login

    ↓

กรอก locked\_out\_user

    ↓

กรอก Password

    ↓

กด Login

    ↓

ตรวจ Error Message

ผลที่ต้องการคือระบบต้องไม่อนุญาตให้ Login และแสดงข้อความ

Epic sadface: Sorry, this user has been locked out.

---

# Step 11 — ใช้ `beforeEach`

Test ใน Inventory Page ทุก Test ต้อง Login ก่อน

จึงใช้

test.beforeEach(async ({ page }) \=\> {

  await login(page);

  await expect(

    page.locator('.inventory\_list')

  ).toBeVisible();

});

หมายความว่าก่อน Test แต่ละตัว Playwright จะทำ

Login

   ↓

ตรวจ Inventory

   ↓

เริ่ม Test

ช่วยลด Code ซ้ำ

---

# Step 12 — Test Case 3: Add Item to Cart

Code

test('should add item to cart', async ({ page }) \=\> {

  await page

    .locator(

      '\[data-test="add-to-cart-sauce-labs-backpack"\]'

    )

    .click();

  await expect(

    page.locator('.shopping\_cart\_badge')

  ).toHaveText('1');

});

## Act

กดปุ่ม Add to Cart

await page

  .locator('\[data-test="add-to-cart-sauce-labs-backpack"\]')

  .click();

## Assert

ตรวจจำนวนสินค้าใน Cart

await expect(

    page.locator('.shopping\_cart\_badge')

).toHaveText('1');

ผลที่ต้องการ

Cart \= 1

แสดงว่าสินค้าถูกเพิ่มเข้า Cart สำเร็จ

---

# Step 13 — Test Case 4: Sort Price Low → High

เลือก Dropdown

const sortDropdown \= page.locator(

  '\[data-test="product-sort-container"\]'

);

ตรวจว่ามองเห็น Dropdown

await expect(sortDropdown).toBeVisible();

เลือก

await sortDropdown.selectOption('lohi');

`lohi` หมายถึง

Low → High

จากนั้นตรวจว่า Dropdown เปลี่ยนจริง

await expect(sortDropdown).toHaveValue('lohi');

ต่อไปอ่านราคาทั้งหมด

const priceTexts \= await page

  .locator('.inventory\_item\_price')

  .allTextContents();

ตัวอย่าง

$7.99

$9.99

$15.99

$15.99

$29.99

$49.99

แปลงข้อความเป็น Number

const prices \= priceTexts.map(

  (text) \=\> Number(text.replace('$', ''))

);

จะได้ประมาณ

\[

  7.99,

  9.99,

  15.99,

  15.99,

  29.99,

  49.99

\]

ตรวจว่ามีสินค้ามากกว่าหนึ่งรายการ

expect(prices.length).toBeGreaterThan(1);

ตรวจว่าทุกค่าเป็นตัวเลข

expect(prices.every(Number.isFinite)).toBe(true);

และตรวจลำดับจริง

expect(prices).toEqual(

  \[...prices\].sort((a, b) \=\> a \- b)

);

จุดนี้สำคัญ เพราะไม่ได้ตรวจแค่ว่า Dropdown เปลี่ยน แต่ตรวจว่า **ผลลัพธ์สินค้าถูกเรียงตามราคาจริง**

---

# Step 14 — Test Case 5: Checkout

เริ่มจาก Login

await login(page);

ตรวจ Inventory

await expect(

  page.locator('.inventory\_list')

).toBeVisible();

เพิ่มสินค้า

await page

  .locator(

    '\[data-test="add-to-cart-sauce-labs-backpack"\]'

  )

  .click();

เปิด Cart

await page

  .locator('.shopping\_cart\_link')

  .click();

กด Checkout

await page

  .locator('\[data-test="checkout"\]')

  .click();

กรอกข้อมูล

await page.locator('\#first-name').fill('John');

await page.locator('\#last-name').fill('Doe');

await page.locator('\#postal-code').fill('12345');

กด Continue

await page

  .locator('\[data-test="continue"\]')

  .click();

กด Finish

await page

  .locator('\[data-test="finish"\]')

  .click();

สุดท้ายตรวจข้อความ

await expect(

  page.locator('.complete-header')

).toHaveText(

  'Thank you for your order\!'

);

ดังนั้น Workflow ของ Checkout คือ

Login

  ↓

Add Product

  ↓

Cart

  ↓

Checkout

  ↓

กรอกข้อมูลลูกค้า

  ↓

Continue

  ↓

Finish

  ↓

ตรวจ Thank you for your order\!

---

# Step 15 — Run Test

หลังสร้าง Test เสร็จแล้ว เปิด Terminal ใน Project

cd demo-playwright

จากนั้น Run

npx playwright test \--project=chromium

Playwright จะค้นหา Test ภายใน

tests/

และ Run Test ทั้งหมด

ตัวอย่างผลที่คาดหวัง

Running 5 tests using 1 worker

✓ should login successfully with standard user

✓ should show error for locked out user

✓ should add item to cart

✓ should sort items by price low to high

✓ should complete checkout process

5 passed

หมายความว่า Test ทั้ง 5 กรณีผ่าน

---

# Step 16 — Run Test พร้อมเปิด Browser

ปกติ Playwright จะ Run แบบ Headless คือไม่แสดง Browser

ถ้าต้องการเห็น Browser ระหว่าง Test ใช้

npx playwright test \--project=chromium \--headed

จะสามารถเห็น Playwright

เปิด Browser

↓

Login

↓

Click

↓

Add Cart

↓

Checkout

แบบอัตโนมัติ

---

# Step 17 — Run เฉพาะ Test File

หากมีหลาย Test File แต่ต้องการรันเฉพาะ SauceDemo

ใช้

npx playwright test tests/test\_saucedemo.spec.ts \--project=chromium

เหมาะสำหรับการแก้ Test File ใดไฟล์หนึ่ง

---

# Step 18 — Run Test Case เฉพาะตัว

ตัวอย่างต้องการทดสอบเฉพาะ Sort

npx playwright test \-g "should sort items by price low to high" \--project=chromium

`-g` คือการค้นหา Test จากชื่อ

จึงไม่จำเป็นต้อง Run Test ทั้งระบบทุกครั้ง

---

# Step 19 — ตรวจสอบ HTML Report

หลัง Test เสร็จ

ใช้

npx playwright show-report

Playwright จะเปิด HTML Report

สามารถตรวจสอบ

Passed

Failed

Duration

Errors

Screenshot

Video

Trace

ได้

---

# Step 20 — กรณี Test Failed

ถ้า Test Failed ไม่ควรแก้ด้วยการเพิ่ม

waitForTimeout()

ทันที

ตัวอย่างเช่น

await page.waitForTimeout(5000);

การรอเพิ่มไม่ได้หมายความว่าปัญหาจะหาย เพราะสาเหตุอาจเป็น Locator ผิด

ตัวอย่าง Locator เดิมที่ผิด

page.locator(

  '\[data-test="product\_sort\_container"\]'

)

Locator ที่ใช้ในตัวอย่างที่ปรับแล้วคือ

page.locator(

  '\[data-test="product-sort-container"\]'

)

ถ้า Locator ผิด Playwright จะหา Element ไม่พบและรอจน Timeout

---

# Step 21 — Debug Test

ใช้ Playwright Inspector

npx playwright test \-g "should sort items by price low to high" \--debug

Playwright จะเปิด Browser และ Inspector

สามารถกด

Step Over

Resume

Pause

เพื่อตรวจแต่ละคำสั่งได้

เช่น

goto

 ↓

fill

 ↓

click

 ↓

locator

 ↓

expect

---

# Step 22 — UI Mode

อีกวิธีหนึ่งคือ

npx playwright test \--ui

UI Mode ช่วยดู Test ทั้งหมดแบบ Graphic

สามารถเลือก Test Case แล้ว Run ทีละตัวได้

เหมาะมากสำหรับการพัฒนาและ Debug Test

---

# Step 23 — Re-test

หลังจากพบ Error และแก้ไขแล้ว ไม่ควรรัน Test ทั้งหมดทันที

ให้ Run Test ที่ Failed ก่อน

ตัวอย่าง

npx playwright test \-g "should sort items by price low to high" \--project=chromium

ถ้าผลเป็น

1 passed

แสดงว่าปัญหาที่แก้ผ่านแล้ว

---

# Step 24 — Regression Test

เมื่อ Test ที่ Failed ผ่านแล้ว ให้ Run Test ทั้ง Suite อีกครั้ง

npx playwright test \--project=chromium

เพื่อตรวจสอบว่าการแก้ไขไม่ได้ทำให้ Test Case อื่นเสีย

ขั้นตอนนี้เรียกว่า

Regression Testing

ผลสุดท้ายควรเป็น

5 passed

หากเว็บไซต์ SauceDemo และ Locator ยังตรงกับ Test ตัวอย่าง

---

# สรุป Test Cases

| Test Case | สิ่งที่ทดสอบ | Expected Result |
| :---- | :---- | :---- |
| TC01 | Login ด้วย standard\_user | เข้าหน้า Inventory |
| TC02 | Login ด้วย locked\_out\_user | แสดง Error |
| TC03 | Add Product | Cart Badge \= 1 |
| TC04 | Sort Low → High | ราคาทั้งหมดเรียงจากต่ำไปสูง |
| TC05 | Checkout | แสดง `Thank you for your order!` |

---

# แนวคิดของ Test ที่ถูกต้อง

แต่ละ Test ควรมีแนวคิด

Arrange

   ↓

Act

   ↓

Assert

## Arrange

เตรียมข้อมูลหรือสถานะก่อน Test

เช่น

Login

เลือก User

เปิดหน้า Inventory

## Act

ทำสิ่งที่ต้องการทดสอบ

เช่น

Click Add Cart

Sort Product

Checkout

## Assert

ตรวจผลลัพธ์

เช่น

Cart \= 1

Price sorted correctly

URL ถูกต้อง

ข้อความ Checkout สำเร็จ

---

# Workflow การทำ Automated Test ที่สมบูรณ์

1\. Install Node.js

        ↓

2\. ตรวจสอบ node \-v และ npm \-v

        ↓

3\. Create Project Folder

        ↓

4\. npm init playwright@latest

        ↓

5\. ตรวจสอบ npx playwright \--version

        ↓

6\. Configure playwright.config.ts

        ↓

7\. Create tests/test\_saucedemo.spec.ts

        ↓

8\. สร้าง Test Cases

        ↓

9\. Arrange → Act → Assert

        ↓

10\. Run Chromium Test

        ↓

11\. ตรวจ Passed / Failed

        ↓

12\. เปิด HTML Report

        ↓

13\. ถ้า Failed → Debug

        ↓

14\. แก้ Root Cause

        ↓

15\. Re-test เฉพาะ Test ที่ Failed

        ↓

16\. Run Full Regression

        ↓

17\. ตรวจสอบว่า Test ทั้งหมด Passed

ดังนั้นกระบวนการ Testing ไม่ได้จบเพียงแค่การกด Run Test แต่ควรประกอบด้วย **การติดตั้ง → การตั้งค่า → การเตรียม Test → การ Execute → การ Verify → การ Debug → การ Re-test → การ Regression Test** จึงจะถือว่าเป็น Workflow การทดสอบที่สมบูรณ์  
