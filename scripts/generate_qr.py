#!/usr/bin/env python3
"""
QR Code Generator for Cryptocurrency Wallets
This script generates QR codes for cryptocurrency wallet addresses.
"""

import os
import json
import qrcode
from pathlib import Path

def ensure_dir(directory):
    """Ensure that a directory exists, creating it if necessary."""
    Path(directory).mkdir(parents=True, exist_ok=True)

def generate_qr_code(text, output_path):
    """Generate a QR code for the given text and save it to the output path."""
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(text)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save(output_path)
    print(f"Generated QR code: {output_path}")

def main():
    """Main function to generate QR codes for cryptocurrency wallets."""
    # Get the project root directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    # Load metadata with wallet addresses
    metadata_path = os.path.join(project_root, 'src', '_data', 'metadata.json')
    with open(metadata_path, 'r') as f:
        metadata = json.load(f)
    
    # Create directory for QR codes
    qr_dir = os.path.join(project_root, 'src', 'assets', 'img', 'qr')
    ensure_dir(qr_dir)
    
    # Generate QR codes for each wallet
    for crypto_type, wallet_info in metadata['crypto'].items():
        address = wallet_info['address']
        output_path = os.path.join(qr_dir, f"{crypto_type}_qr.png")
        generate_qr_code(address, output_path)

if __name__ == "__main__":
    main()
