<?php 

define( 'WP_SITEURL', 'http://boardeffect.com' );
define( 'WP_HOME', WP_SITEURL );

define( 'DISALLOW_FILE_MODS', true );
define( 'DISALLOW_FILE_EDIT', true );

define( 'DISABLE_WP_CRON', true );

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'boardeffect_wp_production');

/** MySQL database username */
define('DB_USER', 'wp');

/** MySQL database password */
define('DB_PASSWORD', 'p@ssw0rd');

define('DB_HOST','localhost');

/** MySQL hostname */
// define('DB_HOST', '62ff693a05761b53f41c7f72271009ca684b2d2c.rackspaceclouddb.com');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */

define('AUTH_KEY',         'AScN6-;[hw<5aS05&g(Xe0l-L&aIz+mlfQIty|f)#UdEeLh%.P?.B:(+?:lTocpC');
define('SECURE_AUTH_KEY',  '9Nfc?BLjV#FdNyqvnkzxbG%Uax8E%<9Q#u57`-U<t7aDB5z@B&s^|@Yu6&Dm0r>~');
define('LOGGED_IN_KEY',    '-W,4G|B}2.~r&Gr4mIX/Le*xSq0l:>^KlHYz>]+4nw@x}E4%c^-[0WzXA#/%[boU');
define('NONCE_KEY',        'XGt;D1tH#~oysIX<k@zvZ+#ptH[jRUEy&AUFyNT!|#ZQ&BY,cC+&~)wCnBB-1BU6');
define('AUTH_SALT',        '9q5yB@_-iVq#f(42>o#L_`Q9*/W$/:H&xT;d)ovKb}klvEBwvf-)pUibjBu|zR1j');
define('SECURE_AUTH_SALT', '72`m5/qc#qPm@|>OvV-|{[$yrAPzd^8^/75Gb>F?Ht4;-dU*%p@x-c&+]wP|t-#T');
define('LOGGED_IN_SALT',   '$`+j-jV(yf&rCt=?/@R!e5Ru*|jzV#h@kZZWd*0d@?Z_wK+mS GI]#Eido![s~Pa');
define('NONCE_SALT',       'de[~hI?ZKTb1tA9dyT|Q%OPa-iGdI&@Kf/Wu^d%4P3I;wpZFA(;+N+VBCrK5x_S6');
/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_nbvnnawmvq_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

define('FS_METHOD', 'direct');

//define('WP_HOME','http://104.130.131.40');
//define('WP_SITEURL','http://104.130.131.40/');

//define('WP_HOME','http://www.boardeffect.com/');
//define('WP_SITEURL','http://www.boardeffect.com/');

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

 ?>