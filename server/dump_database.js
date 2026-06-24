// Script to generate neshosp.sql from the live MySQL database
import fs from 'fs';
import mysql from 'mysql2/promise';

const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'neshosp',
  port: parseInt(process.env.DB_PORT || '3306', 10),
};

async function generateDump() {
  console.log('Connecting to MySQL to generate dump...');
  const conn = await mysql.createConnection(config);
  
  let sqlContent = `-- MySQL Database Dump for New Life Hospital
-- Host: localhost    Database: neshosp
-- Generated dynamically on ${new Date().toISOString()}
-- ------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

`;

  const tables = ['admins', 'doctors', 'appointments', 'inquiries', 'testimonials', 'banners', 'services'];

  for (const table of tables) {
    console.log(`Processing table: ${table}...`);
    sqlContent += `\n--\n-- Table structure for table \`${table}\`\n--\n\nDROP TABLE IF EXISTS \`${table}\`;\n`;
    
    // Get Create Table statement
    const [createResult] = await conn.query(`SHOW CREATE TABLE \`${table}\``);
    let createSql = createResult[0]['Create Table'];
    
    // Clean up create SQL (standardize)
    sqlContent += `${createSql};\n\n`;

    // Get table rows
    sqlContent += `--\n-- Dumping data for table \`${table}\`\n--\n\n`;
    const [rows] = await conn.query(`SELECT * FROM \`${table}\``);
    
    if (rows.length > 0) {
      sqlContent += `LOCK TABLES \`${table}\` WRITE;\n`;
      sqlContent += `/*!40000 ALTER TABLE \`${table}\` DISABLE KEYS */;\n`;
      
      const columns = Object.keys(rows[0]).map(c => `\`${c}\``).join(', ');
      sqlContent += `INSERT INTO \`${table}\` (${columns}) VALUES\n`;
      
      const valueStrings = rows.map(row => {
        const vals = Object.values(row).map(val => {
          if (val === null) return 'NULL';
          if (typeof val === 'number') return val;
          // Escape quotes and newlines
          const escaped = String(val)
            .replace(/\\/g, '\\\\')
            .replace(/'/g, "\\'")
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r');
          return `'${escaped}'`;
        });
        return `(${vals.join(', ')})`;
      });
      
      sqlContent += valueStrings.join(',\n') + ';\n';
      sqlContent += `/*!40000 ALTER TABLE \`${table}\` ENABLE KEYS */;\n`;
      sqlContent += `UNLOCK TABLES;\n`;
    } else {
      sqlContent += `-- No records found in \`${table}\`\n`;
    }
  }

  sqlContent += `\n/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
`;

  fs.writeFileSync('server/neshosp.sql', sqlContent, 'utf8');
  console.log('Database dump saved successfully to server/neshosp.sql');
  
  await conn.end();
}

generateDump().catch(console.error);
